<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CustomerRepository")
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=45)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=25)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $address_number;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $street_number;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $street_name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    private $pc;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $building;

    // /**
    //  * @ORM\OneToMany(targetEntity="App\Entity\Bill", mappedBy="customer")
    //  */
    // private $bills;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FlatRate", mappedBy="customer", orphanRemoval=true)
     */
    private $flatRates;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $picture = "/build/images/user.png";

    /**
     * @ORM\Column(type="boolean")
     */
    private $newsletter;

    public function __construct()
    {
        // $this->bills = new ArrayCollection();
        $this->flatRates = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAddressNumber(): ?string
    {
        return $this->address_number;
    }

    public function setAddressNumber(?string $address_number): self
    {
        $this->address_number = $address_number;

        return $this;
    }

    public function getStreetNumber(): ?string
    {
        return $this->street_number;
    }

    public function setStreetNumber(?string $street_number): self
    {
        $this->street_number = $street_number;

        return $this;
    }

    public function getStreetName(): ?string
    {
        return $this->street_name;
    }

    public function setStreetName(?string $street_name): self
    {
        $this->street_name = $street_name;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPc(): ?string
    {
        return $this->pc;
    }

    public function setPc(?string $pc): self
    {
        $this->pc = $pc;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getBuilding(): ?string
    {
        return $this->building;
    }

    public function setBuilding(?string $building): self
    {
        $this->building = $building;

        return $this;
    }

    // /**
    //  * @return Collection|Bill[]
    //  */
    // public function getBills(): Collection
    // {
    //     return $this->bills;
    // }

    // public function addBill(Bill $bill): self
    // {
    //     if (!$this->bills->contains($bill)) {
    //         $this->bills[] = $bill;
    //         $bill->setCustomer($this);
    //     }

    //     return $this;
    // }

    // public function removeBill(Bill $bill): self
    // {
    //     if ($this->bills->contains($bill)) {
    //         $this->bills->removeElement($bill);
    //         // set the owning side to null (unless already changed)
    //         if ($bill->getCustomer() === $this) {
    //             $bill->setCustomer(null);
    //         }
    //     }

    //     return $this;
    // }

    /**
     * @return Collection|FlatRate[]
     */
    public function getFlatRates(): Collection
    {
        return $this->flatRates;
    }

    public function addFlatRate(FlatRate $flatRate): self
    {
        if (!$this->flatRates->contains($flatRate)) {
            $this->flatRates[] = $flatRate;
            $flatRate->setCustomer($this);
        }

        return $this;
    }

    public function removeFlatRate(FlatRate $flatRate): self
    {
        if ($this->flatRates->contains($flatRate)) {
            $this->flatRates->removeElement($flatRate);
            // set the owning side to null (unless already changed)
            if ($flatRate->getCustomer() === $this) {
                $flatRate->setCustomer(null);
            }
        }

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getNewsletter(): ?bool
    {
        return $this->newsletter;
    }

    public function setNewsletter(bool $newsletter): self
    {
        $this->newsletter = $newsletter;

        return $this;
    }
}
