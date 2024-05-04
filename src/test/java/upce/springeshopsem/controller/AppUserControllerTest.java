package upce.springeshopsem.controller;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import upce.springeshopsem.entity.AppUser;
import upce.springeshopsem.mock.WithMockAdmin;
import upce.springeshopsem.mock.WithMockUser;
import upce.springeshopsem.repository.AppUserRepository;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles("test")
class AppUserControllerTest {

    @Autowired
    private MockMvc api;

    @Autowired
    AppUserRepository appUserRepository;

    @BeforeEach
    void setUp() {
        AppUser appUser = new AppUser();
        appUser.setUsername("user");
        appUserRepository.save(appUser);
    }

    @AfterEach
    void teardown() {
        appUserRepository.deleteAll();
    }

    @Test
    @WithMockAdmin
    void testExistingUserEndpoint() throws Exception {
        AppUser appUser = appUserRepository.findByUsername("user");
        Long id = appUser.getId();
        System.out.println(id);
        api.perform(get("/appusers/{id}", id))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockAdmin
    void testAdminShouldSeeAdminEndpoint() throws Exception {
        api.perform(get("/appusers")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "username")
                        .param("sortOrder", "asc"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testLoggedInButNotAdminShouldNotSeeAdminEndpoint() throws Exception {
        api.perform(get("/appusers")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "username")
                        .param("sortOrder", "asc"))
                .andExpect(status().isForbidden());
    }

    @Test
    void testNotLoggedInShouldNotSeeAdminEndpoint() throws Exception {
        api.perform(get("/appusers")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "username")
                        .param("sortOrder", "asc"))
                .andExpect(status().isUnauthorized());

    }

    @Test
    void testUserCount() throws Exception {
        long userCount = appUserRepository.count();
        assertEquals(1, userCount);
    }

    @Test
    public void testCreateAppUser() throws Exception {
        String requestBody = "{\"username\":\"testuser\",\"password\":\"testpassword\",\"email\":\"test@example.com\"}";
        api.perform(post("/appusers")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());

        AppUser savedUser = appUserRepository.findByUsername("testuser");
        assertNotNull(savedUser);
        assertEquals("testuser", savedUser.getUsername());
        assertEquals("test@example.com", savedUser.getEmail());
    }


    @Test
    @WithMockAdmin
    public void testDeleteAppUser() throws Exception {
        AppUser testUser = new AppUser();
        testUser.setUsername("deleteUser");
        testUser.setPassword("password");
        testUser.setEmail("delete@example.com");
        appUserRepository.save(testUser);

        api.perform(delete("/appusers/{id}", testUser.getId()))
                .andExpect(status().isNoContent());

        AppUser deletedUser = appUserRepository.findByUsername("deleteUser");
        assertNull(deletedUser);
    }
}

