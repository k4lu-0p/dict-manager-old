<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity(repositoryClass="App\Repository\AdminRepository")
 * 
 * @UniqueEntity(
 *   fields={"username"},
 *   message="Le nom d'utilisateur que vous avez indiqué est déjà utilisé !" 
 * )
 */
class Admin implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=65)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=65)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=25)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $societyNumber;

    
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @Assert\Email(
     *    message = "The email '{{ value }}' is not a valid email.",
     *    checkMX = true
     * 
     * )
     * @ORM\Column(type="string", length=100)
     */
    protected $username;

    /**
     * @ORM\Column(type="simple_array")
     */
    private $roles = [];


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getSocietyNumber(): ?string
    {
        return $this->societyNumber;
    }

    public function setSocietyNumber(string $societyNumber): self
    {
        $this->societyNumber = $societyNumber;

        return $this;
    }

    
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }
    
    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    public function getRoles(): ?array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
        
    }
}
