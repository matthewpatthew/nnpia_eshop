package upce.springeshopsem.security;

import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.security.SignatureException;

//@RestControllerAdvice
public class CustomExceptionHandler {

//    @ExceptionHandler(Exception.class)
//    public ProblemDetail handleSecurityException(Exception ex) {
//
//        ProblemDetail error = null;
//        if (ex instanceof BadCredentialsException) {
//            error = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), ex.getMessage());
//            error.setProperty("access_denied", "Authentication failure");
//        }
//
//        if (ex instanceof AccessDeniedException) {
//            error = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
//            error.setProperty("access_denied", "Not authorized");
//        }
//
//        if (ex instanceof SignatureException) {
//            error = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
//            error.setProperty("access_denied", "JWT Signature not valid");
//        }
//
//        if (ex instanceof TokenExpiredException) {
//            error = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
//            error.setProperty("access_denied", "JWT Signature not valid");
//        }
//
//        return error;
//    }
}
