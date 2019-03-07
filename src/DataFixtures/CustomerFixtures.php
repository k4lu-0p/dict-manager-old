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
        
        $faker = \Faker\Factory::create('fr_FR');

            for ($i = 0; $i < 10; $i++) {

// ===== Forfaits ============================================================
            
            $flatRate = new FlatRate();
            
            $nombreSession = 10 ; // $faker->numberBetween($min = 5,$max = 20);

            $freeSession = $nombreSession/10;

            $flatRate->setDate($faker->dateTime($max = 'now', $timezone = null))
                     ->setSessionNumber($nombreSession)
                     ->setPrice(($nombreSession-$freeSession)*250);

// ===== Sessions ============================================================
                            
            for ($j=0; $j < 10; $j++) { 
                
                $session = new Session();

                $session->setDate($faker->dateTime($max = 'now', $timezone = null));
                if ($j == 0) {
                    $session->setFree(true);
                } else {
                    $session->setFree(false);
                }
                $session->setFlatRateId($flatRate);
                $manager->persist($session);

            }

            $manager->persist($flatRate);

// ===== Factures ============================================================

            $bill = new Bill();

            $bill->setTax(10);
            
            $manager->persist($bill);

// ===== Clients ============================================================

            $customer = new Customer();

            $customer->setFirstname($faker->firstName)
                     ->setLastname($faker->lastName)
                     ->setPhone($faker->phoneNumber)
                     ->setEmail($faker->email)
                     ->setAddressNumber($faker->numerify('##### #####'))
                     ->addFlatRate($flatRate)
                     ->addBill($bill);

            $manager->persist($customer);
            
        }
        
// ===== NewsLetter ============================================================

        $newsLetter = new Newsletter();
        
        $newsLetter->setSubject($faker->sentence($nb = 3, $variableNbWordds = true))
                   ->setContent($faker->paragraph($nbSentences = 4, $variableNbSentences = true))
                   ->setPicture($faker->imageUrl($width = 640, $height = 240));

        $manager->persist($newsLetter);

        $manager->flush();
    }
}
