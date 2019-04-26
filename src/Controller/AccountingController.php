<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\BillRepository;
use App\Repository\CustomerRepository;
use Dompdf\Dompdf;
use Dompdf\Options;
use App\Entity\FlatRate;
use App\Entity\Bill;
use App\Repository\AdminRepository;
use Symfony\Component\HttpFoundation\Request;

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
            $customer["picture"] = $customerName->getPicture();
            $bill["customer"] = $customer;

            // FlatRate
            $flatRate["id"] = $oneBill->getFlatRate()->getId();
            $flatRate["price"] = $oneBill->getFlatRate()->getPrice();
            $flatRate["createdAt"] = $oneBill->getFlatRate()->getCreatedAt();
            $flatRate["nbSessions"] = $oneBill->getFlatRate()->getSessionNumber();
            $bill["flatRate"] = $flatRate;

            array_push($bills, $bill);

            // Remise à zero
            $flatRate = [];
            $customer = [];
            $bill = [];
        }

        return $this->render('accounting/show.html.twig', [
            "bills" => $bills,
        ]);
    }

    /**
     * @Route("/show/{id}", name="showOneBill")
     */
    public function showOneBill($id)
    {

        $repo = $this->getDoctrine()->getRepository(Bill::class);
        $bill = $repo->find($id);

        $currentBill = [];
        $customer = [];
        $flatRate = [];

        $customerName = $bill->getCustomer();

        // Id
        $currentBill["id"] = $bill->getId();

        // Created_at
        $currentBill["createdAt"] = $bill->getCreatedAt();

        // Taxes
        $currentBill["tax"] = $bill->getTax();

        // Customer
        $customer["id"] = $customerName->getId();
        $customer["firstname"] = $customerName->getFirstname();
        $customer["lastname"] = $customerName->getLastname();
        $customer["phone"] = $customerName->getPhone();
        $customer["makani"] = $customerName->getAddressNumber();
        $currentBill["customer"] = $customer;

        // FlatRate
        $flatRate["id"] = $bill->getFlatRate()->getId();
        $flatRate["price"] = $bill->getFlatRate()->getPrice();
        $flatRate["createdAt"] = $bill->getFlatRate()->getCreatedAt();
        $flatRate["nbSessions"] = $bill->getFlatRate()->getSessionNumber();
        // $flatRate["nbFreeSessions"] = $bill->getFlatRate()->getSessions();
        $currentBill["flatRate"] = $flatRate;

        return $this->render('accounting/showOneBill.html.twig', [
            'title' => 'Bill',
            "bill" => $currentBill,
        ]);
    }

    /**
     * @Route("/download/{id}", name="downloadBill")
     */
    public function downloadBill(Bill $bill, AdminRepository $adminRepo)
    {
        $currentBill = [];
        $admin = [];
        $customer = [];
        $flatRate = [];

        $customerName = $bill->getCustomer();
        $theAdmin = $adminRepo->findAll();

        // Id
        $currentBill["id"] = $bill->getId();

        // Created_at
        $currentBill["createdAt"] = $bill->getCreatedAt();

        // Taxes
        $currentBill["tax"] = $bill->getTax();

        // Info admin
        $admin["firstname"] = $theAdmin[0]->getFirstname();
        $admin["lastname"] = $theAdmin[0]->getLastname();
        $admin["phone"] = $theAdmin[0]->getPhone();
        $admin["societyNumber"] = $theAdmin[0]->getSocietyNumber();
        $currentBill["admin"] = $admin;

        // Customer
        $customer["id"] = $customerName->getId();
        $customer["firstname"] = $customerName->getFirstname();
        $customer["lastname"] = $customerName->getLastname();
        $customer["phone"] = $customerName->getPhone();
        $customer["makani"] = $customerName->getAddressNumber();
        $currentBill["customer"] = $customer;

        // FlatRate
        $flatRate["id"] = $bill->getFlatRate()->getId();
        $flatRate["price"] = $bill->getFlatRate()->getPrice();
        $flatRate["createdAt"] = $bill->getFlatRate()->getCreatedAt();
        $flatRate["nbSessions"] = $bill->getFlatRate()->getSessionNumber();
        $flatRate["dateStart"] = $bill->getFlatRate()->getCreatedAt();
        // $flatRate["nbSessions"] = $bill->getFlatRate()->getSessions();
        $currentBill["flatRate"] = $flatRate;

        $dompdf = new Dompdf();

        $html = $this->renderView('bill/bill.html.twig', [
            "bill" => $currentBill
        ]);

        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (force download)
        $dompdf->stream("Facture-" . $currentBill["id"] . ".pdf", [
            "Attachment" => true
        ]);
        return $this;
    }

    /**
     * @Route("/search", name="searchBill")
     */
    public function searchBill(Request $request, BillRepository $repo)
    {
        $res = $repo->findBySearch($request->get('search'));

        // foreach ($res as  $value) {
        //     dump($value);
        // }
        // die();
        return $this->render('accounting/search.html.twig', [
            'bills' => $res
        ]);
    }
}