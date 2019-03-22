<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\BillRepository;
use App\Repository\CustomerRepository;

/**
 * @Route("/app/accounting")
 */
class AccountingController extends AbstractController
{
    /**
     * @Route("/", name="accounting")
     */
    public function index(BillRepository $billRepo)
    {
        $allBill = $billRepo->findAll();
        $bill = [];
        $bills = [];
        foreach ($allBill as $oneBill) {
            $customerName = $oneBill->getCustomer();

            array_push($bill, $oneBill->getId());
            array_push($bill, $oneBill->getCreatedAt());
            array_push($customer, $customerName->getFirstname());
            array_push($customer, $customerName->getFirstname());
            array_push($bill, $customer);
            array_push($bill, $oneBill->getTax());
            
            array_push($bills, $bill);
            $bill = [];
        }
        die();
        return $this->render('accounting/show.html.twig', [
            'title' => 'My account handler\'s',
            "allCustomersBills" => $customer,
        ]);
    }
}

