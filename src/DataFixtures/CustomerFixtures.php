<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Customer;

class CustomerFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        
        $faker = \Faker\Factory::create('fr_FR');

            for ($i = 0; $i < 10; $i++) {
                
            $customer = new Customer();

            $customer->setFirstname($faker->firstName)
                     ->setLastname($faker->lastName)
                     ->setPhone($faker->phoneNumber)
                     ->setEmail($faker->email)
                     ->setAddressNumber($faker->numerify('##### #####'));

            $manager->persist($customer);

            $manager->flush();

        }
    }
}
