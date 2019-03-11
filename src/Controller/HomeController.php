<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home()
    {
        return $this->redirectToRoute('app');
    }

    /**
     * @Route("/app", name="app")
     */
    public function app()
    {
        return $this->render( 'statistics/show.html.twig', [
        ]);
    }
}