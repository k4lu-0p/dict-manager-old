<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;
use App\Repository\CustomerRepository;

/**
 * @Route("/app/customers")
 */
class CustomersController extends AbstractController
{
    /**
     * @Route("/show/all", name="customers")
     */
    public function index()
    {
        return $this->render('customers/index.html.twig', [
            'controller_name' => 'CustomersController',
        ]);
    }

// Problem autowire

    /**
     * @Route("/show/{id}", name="customerById")
     */
    public function test(CustomerRepository $customer, Customer $pute){
        dump($customer->findAll(), $customer->findOneById(1));
        die;
        return $this->render('customers/details.html.twig', [
        ]);
    }
}
