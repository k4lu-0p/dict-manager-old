<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;

/**
 * @Route("/app/flaterate")
 */
class FlaterateController extends AbstractController
{

    /**
     * @Route("/new/{id}", name="newFlaterateForOneCustomer")
     */
    public function newFlaterateForOneCustomer(Customer $customer)
    {
        return $this->render('flatrate/addOne.html.twig', [
            'customer' => $customer

        ]);
    }
}
