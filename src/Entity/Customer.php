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
     * @ORM\Column(type="string", length=65)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=65)
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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $street_name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $building;
    
    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    private $pc;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $country;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FlatRate", mappedBy="customer_id")
     */
    private $flatRates;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Bill", mappedBy="customer_id")
     */
    private $bills;

    public function __construct()
    {
        $this->flatRates = new ArrayCollection();
        $this->bills = new ArrayCollection();
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

    public function getStreetName(): ?string
    {
        return $this->street_name;
    }

    public function setStreetName(string $street_name): self
    {
        $this->street_name = $street_name;

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

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

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

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

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
            $flatRate->setCustomerId($this);
        }

        return $this;
    }

    public function removeFlatRate(FlatRate $flatRate): self
    {
        if ($this->flatRates->contains($flatRate)) {
            $this->flatRates->removeElement($flatRate);
            // set the owning side to null (unless already changed)
            if ($flatRate->getCustomerId() === $this) {
                $flatRate->setCustomerId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Bill[]
     */
    public function getBills(): Collection
    {
        return $this->bills;
    }

    public function addBill(Bill $bill): self
    {
        if (!$this->bills->contains($bill)) {
            $this->bills[] = $bill;
            $bill->setCustomerId($this);
        }

        return $this;
    }

    public function removeBill(Bill $bill): self
    {
        if ($this->bills->contains($bill)) {
            $this->bills->removeElement($bill);
            // set the owning side to null (unless already changed)
            if ($bill->getCustomerId() === $this) {
                $bill->setCustomerId(null);
            }
        }

        return $this;
    }
}