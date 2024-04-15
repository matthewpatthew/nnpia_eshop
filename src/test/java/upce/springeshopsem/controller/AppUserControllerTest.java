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
    void testNonExistingUserEndpoint() throws Exception {
        String existingUserId = "0";
        api.perform(get("/appusers/{id}", existingUserId))
                .andExpect(status().isNotFound());
    }

    @Test
    void testNotLoggedInShouldNotSeeSecuredEndpoint() throws Exception {
        api.perform(get("/appusers"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void testUserShouldNotSeeAdminEndpoint() throws Exception {
        api.perform(get("/appusers/1"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockAdmin
    void testAdminShouldSeeAdminEndpoint() throws Exception {
        api.perform(get("/appusers"))
                .andExpect(status().isOk());
    }
}