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
    public function showCustomers(CustomerRepository $repo)
    {
        $customers = $repo->findAll();
        return $this->render('customers/index.html.twig', [
            'customers' => $customers,
        ]);
    }

    /**
     * @Route("/add", name="addCustomer")
     */
    public function addCustomer(Customer $customer){
        return $this->render('customers/add.html.twig', [
            'customerId' => $customer->getId()
            ]);
    }

    /**
     * @Route("/show/{id}", name="showCustomer")
     */
    public function showCustomer(Customer $customer){
        return $this->render('customers/details.html.twig', [
            'customerId' => $customer->getId()
            ]);
    }

    /**
     * @Route("/edit/{id}", name="editCustomer")
     */
    public function editCustomer(Customer $customer){
        return $this->render('customers/edit.html.twig', [
            'customerId' => $customer->getId()
            ]);
    }

    /**
     * @Route("/delete/{id}", name="deleteCustomer")
     */
    public function deleteCustomer(Customer $customer){
        return $this->render('customers/delete.html.twig', [
            'customerFirstname' => $customer->getFirstname(),
            'customerLastname' => $customer->getLastname()
            ]);
    }
}
