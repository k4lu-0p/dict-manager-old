<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CustomerRepository;

/**
 * @Route("/app/customers")
 */
class CustomersController extends AbstractController
{
    /**
     * @Route("/show", name="customers")
     */
    public function showCustomers(CustomerRepository $repo)
    {
        $customers = $repo->findAll();
        // dump($customers);die;
        return $this->render('customers/index.html.twig', [
            'customers' => $customers,
        ]);
    }
}
