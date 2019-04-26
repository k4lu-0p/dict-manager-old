<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Customer;
use App\Entity\FlatRate;
use App\Entity\Session;
use App\Entity\Bill;
use App\Entity\Newsletter;

class CustomerFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

    //     $faker = \Faker\Factory::create('fr_FR');

    //     for ($i = 0; $i < 30; $i++) {

    //         // ===== Forfaits ============================================================

    //         // $flatRate = new FlatRate();
    //         // $flatRate2 = new FlatRate();

    //         // $nombreSession = 10; // $faker->numberBetween($min = 5,$max = 20);
    //         // $freeSession = $nombreSession / 10;

    //         // $flatRate->setCreatedAt($faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null))
    //         //     ->setSessionNumber($nombreSession)
    //         //     ->setPrice(($nombreSession) * 227);

    //         // $flatRate2->setCreatedAt($faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null))
    //         //     ->setSessionNumber($nombreSession)
    //         //     ->setPrice(($nombreSession) * 227);    

                

    //         // ===== Factures ============================================================

    //         // $bill = new Bill();

    //         // $bill->setTax(10)
    //         //     ->setCreatedAt(new \DateTime('now +1 hour'))
    //         //     ->setFlatRate($flatRate);

    //         // $manager->persist($bill);

    //         // ===== Sessions ============================================================

    //         // for ($j = 0; $j < 10; $j++) {

    //         //     $session = new Session();

    //         //     $session->setDateStart($faker->dateTimeBetween($startDate = 'now', $endDate = '+19 day', $timezone = null));
    //         //     $session->setDateEnd($faker->dateTimeBetween($startDate = '+20 day', $endDate = '+20 day', $timezone = null));
    //         //     if ($j == 0) {
    //         //         $session->setFree(true);
    //         //     } else {
    //         //         $session->setFree(false);
    //         //     }

    //         //     $session->setFlatRate($flatRate);

    //         //     $manager->persist($session);
    //         // }
    //         // $manager->persist($flatRate);

    //         // for ($j = 0; $j < 10; $j++) {

    //         //     $session2 = new Session();

    //         //     $session2->setDateStart($faker->dateTimeBetween($startDate = 'now', $endDate = '+19 day', $timezone = null));
    //         //     $session2->setDateEnd($faker->dateTimeBetween($startDate = '+20 day', $endDate = '+20 day', $timezone = null));
    //         //     if ($j == 0) {
    //         //         $session2->setFree(true);
    //         //     } else {
    //         //         $session2->setFree(false);
    //         //     }

    //         //     $session2->setFlatRate($flatRate2);

    //         //     $manager->persist($session2);
    //         // }
    //         // $manager->persist($flatRate2);

    //         // ===== Clients ============================================================

    //         $customer = new Customer();
    //         $customer->setFirstname($faker->firstName)
    //             ->setLastname($faker->lastName)
    //             ->setPhone($faker->phoneNumber)
    //             ->setEmail($faker->email)
    //             ->setAddressNumber($faker->numerify('##### #####'))
    //             // ->addFlatRate($flatRate)
    //             // ->addFlatRate($flatRate2)
    //             ->setNewsletter(true)
    //             ->setCreatedAt(new \DateTime('now +1 hour'));
    //             // ->addBill($bill);
    //         $manager->persist($customer);
    //     }

    //     // ===== NewsLetter ============================================================

    //     $newsLetter = new Newsletter();

    //     $newsLetter->setSubject($faker->sentence($nb = 3, $variableNbWordds = true))
    //         ->setContent($faker->paragraph($nbSentences = 4, $variableNbSentences = true))
    //         ->setPicture($faker->imageUrl($width = 640, $height = 240));

    //     $manager->persist($newsLetter);

    //     $manager->flush();
    }
}
