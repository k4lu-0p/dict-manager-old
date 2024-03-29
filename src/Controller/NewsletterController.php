<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\NewsletterType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Newsletter;
use Symfony\Flex\Response;
use App\Repository\CustomerRepository;

/**
 * @Route("/app/newsletter")
 */
class NewsletterController extends AbstractController
{

    /**
     * @Route("/new", name="newsletter")
     */
    public function index(Request $request, ObjectManager $manager, \Swift_Mailer $mailer, CustomerRepository $repositoryCustomers)
    {

        $newsletter = new Newsletter();
        $form = $this->createForm(NewsletterType::class, $newsletter);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $manager->persist($newsletter);
            $manager->flush();

            $customersMail = $repositoryCustomers->findAllEmail();

            foreach ($customersMail as $elem) {

                $mail = (new \Swift_Message("DICT : News !"))
                    ->setFrom('lionl70@aol.fr')
                    ->setTo($elem["email"])
                    ->setBody(
                        $this->renderView(
                            'mail/mail.html.twig',
                            [
                                'content' => $newsletter->getContent(),
                                'subject' => $newsletter->getSubject(),
                                'image' => $newsletter->getPicture() ? $newsletter->getPicture() : false
                            ]
                        ),
                        'text/html'
                    );
                $mailer->send($mail);
            }
        }

        return $this->render('newsletter/create.html.twig', [
            'title' => 'Send your newsletter',
            'form' => $form->createView()
        ]);
    }
}
