package upce.springeshopsem.controller;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import upce.springeshopsem.mock.WithMockAdmin;
import upce.springeshopsem.mock.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppUserControllerTest {

    @Autowired
    private MockMvc api;

    @Test
    @WithMockAdmin
    void testExistingUserEndpoint() throws Exception {
        String existingUserId = "1";
        api.perform(get("/appusers/{id}", existingUserId))
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
    void testNotLoggedInShouldNotSeeSecuredEndpoint() throws Exception {
        api.perform(get("/appusers")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "username")
                        .param("sortOrder", "asc"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    void testUserShouldNotSeeAdminEndpoint() throws Exception {
        api.perform(get("/appusers/2"))
                .andExpect(status().isForbidden());
    }


}