<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use App\Form\CustomerType;

/**
 * @Route("/app/customers")
 */
class CustomersController extends AbstractController
{
    /**
     * @Route("/show/all", name="showAllcustomers")
     */
    public function showAllCustomers(CustomerRepository $repo)
    {
        $customers = $repo->findAll();
        return $this->render('customers/showAll.html.twig', [
            'customers' => $customers,
        ]);
    }

    /**
     * @Route("/show/{id}", name="showOneCustomer")
     */
    public function showOneCustomer(Customer $customer, CustomerRepository $repo)
    {
        return $this->render('customers/showOne.html.twig', [
            'customer' => $customer
        ]);
    }

    /**
     * @Route("/delete/{id}", name="deleteOneCustomer")
     */
    public function deleteOneCustomer($id, ObjectManager $manager)
    {
        $repo = $this->getDoctrine()->getRepository(Customer::class);
        $manager->remove($repo->find($id));
        $manager->flush();

        return $this->redirectToRoute('showAllcustomers');
    }

    // /**
    //  * @Route("/add", name="addCustomer")
    //  */
    // public function addCustomer(Request $request, ObjectManager $manager)
    // {
    //     $customer = new Customer();

    //     $form = $this->createForm(CustomerType::class, $customer);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted()) {

    //         // Dump ne donnant rien, la condition n'est donc pas remplit =============================================================================

    //         dump($form);
    //         die;
    //     };

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         dump($form);
    //         die;

    //         $manager->persist($customer);
    //         $manager->flush();
    //     };
    //     return $this->render('customers/add.html.twig', [
    //         'form' => $form->createView()
    //     ]);
    // }



    // /**
    //  * @Route("/edit/{id}", name="editCustomer")
    //  */
    // public function editCustomer(Request $request, ObjectManager $manager, Customer $customer)
    // {

    //     $form = $this->createForm(CustomerType::class, $customer);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $manager->persist($customer);
    //         $manager->flush();
    //     } else {
    //         return $this->render('customers/edit.html.twig', [
    //             'customer_firstname' => $customer->getFirstname(),
    //             'customer_lastname' => $customer->getLastname(),
    //             'customer_id' => $customer->getId(),
    //             'form' => $form->createView()
    //         ]);
    //     }
    // }
}
