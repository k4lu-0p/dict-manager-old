<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\NewsletterType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Newsletter;

/**
 * @Route("/app/newsletter")
 */
class NewsletterController extends AbstractController
{
    /**
     * @Route("/create", name="newsletter")
     */
    public function index(Request $request, ObjectManager $manager)
    {
        $newsletter = new Newsletter;
        $form = $this->createForm(NewsletterType::class, $newsletter);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($newsletter);
            $manager->flush();
        }

        return $this->render('newsletter/create.html.twig', [
            'title' => 'Send your newsletter',
            'form' => $form->createView()
        ]);
    }
}
