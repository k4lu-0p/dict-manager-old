<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Admin;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AdminFixtures extends Fixture
{
    /**
    * @var UserPasswordEncoderInterface
    */
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder) 
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $admin = new Admin();
        $hash = $this->passwordEncoder->encodePassword($admin, "dictfze70300");

        $admin->setUsername('lionl70@aol.com')
        ->setFirstname('Lionel')
        ->setLastname('Cholley')
        ->setPhone('+971568788903')
        ->setRoles(['ROLE_ADMIN'])
        ->setSocietyNumber('000000')
        ->setPassword($hash);
        
        $manager->persist($admin);
        $manager->flush();    
    }
}
