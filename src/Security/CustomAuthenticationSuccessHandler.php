<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    private $jwtTokenManager;

    public function __construct(JWTTokenManagerInterface $jwtTokenManager)
    {
        $this->jwtTokenManager = $jwtTokenManager;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): ?Response
    {
        /** @var \App\Entity\Customer $user */
        $user = $token->getUser();
        $token = $this->jwtTokenManager->create($user);

        $data = [
            'token' => $token,
            'user' => [
                'email' => $user->getEmail(),
                'password' => $user->getPassword(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastName(),
                'roles' => $user->getRoles(),
                'uid' => $user->getUid(),
            ],
        ];

        return new JsonResponse($data);
    }
}
