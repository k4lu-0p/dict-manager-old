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
        $hash = $this->passwordEncoder->encodePassword($admin, "online@2017");

        $admin->setUsername('admin@admin.com')
        ->setFirstname('john')
        ->setLastname('doe')
        ->setPhone('0909090909')
        ->setRoles(['ROLE_ADMIN'])
        ->setSocietyNumber('9Y9XXX9Y9')
        ->setPassword($hash);
        
        $manager->persist($admin);
        $manager->flush();    
    }
}
