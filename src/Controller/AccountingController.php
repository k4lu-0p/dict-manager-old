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
        
        $bills = [];
        $bill = [];
        $customer = [];
        $flatRate = [];

        foreach ($allBill as $oneBill) {
            $customerName = $oneBill->getCustomer();

            // Id
            $bill["id"] = $oneBill->getId();

            // Created_at
            $bill["createdAt"] = $oneBill->getCreatedAt();

            // Taxes
            $bill["tax"] = $oneBill->getTax();

            // Customer
            $customer["id"] = $customerName->getId();
            $customer["firstname"] = $customerName->getFirstname();
            $customer["lastname"] = $customerName->getLastname();
            $bill["customer"] = $customer;

            // FlatRate
            $flatRate["id"] = $oneBill->getFlatRate()->getId();
            $flatRate["dateStart"] = $oneBill->getFlatRate()->getDateStart();
            $flatRate["dateEnd"] = $oneBill->getFlatRate()->getDateEnd();
            $flatRate["nbSessions"] = $oneBill->getFlatRate()->getSessionNumber();
            $bill["flatRate"] = $flatRate;

            array_push($bills, $bill);

            // Remise 
            $flatRate = [];
            $customer = [];
            $bill = [];
        }
        
        return $this->render('accounting/show.html.twig', [
            'title' => 'My account handler\'s',
            "bills" => $bills,
        ]);
    }
}
