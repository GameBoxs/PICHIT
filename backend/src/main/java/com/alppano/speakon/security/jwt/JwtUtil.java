package com.alppano.speakon.security.jwt;

import com.alppano.speakon.security.LoginUser;
import com.alppano.speakon.user.entity.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    public static final long TOKEN_VALIDATION_SECOND = 1000L * 60 * 60 * 24 * 7 * 3;

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    @Value("${jwt.issuer}")
    private String JWT_ISSUER;

    public DecodedJWT decodeToken(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC512(JWT_SECRET);

        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(JWT_ISSUER)
                .build();
        return verifier.verify(token);
    }

    public String createToken(LoginUser user) throws JWTCreationException {
        Algorithm algorithm = Algorithm.HMAC512(JWT_SECRET);
        String jwt = JWT.create()
                .withIssuer(JWT_ISSUER)
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_VALIDATION_SECOND))
                .withClaim("id", user.getId())
                .withClaim("userId",user.getUsername())
                .withClaim("name",user.getName())
                .sign(algorithm);
        return jwt;
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = decodeToken(token).getExpiresAt();
        return expiration.before(new Date());
    }

    public Long getId(String token) {
        return decodeToken(token).getClaim("id").asLong();
    }

    public Boolean validateToken(String token, User user) {
        final Long id = getId(token);
        return (id == user.getId() && !isTokenExpired(token));
    }
}