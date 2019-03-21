<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

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
     * @ORM\Column(type="string", length=100)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $addressNumber;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $streetNumber;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     */
    private $streetName;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $pc;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $building;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Bill", mappedBy="customer", cascade={"persist", "remove"}, orphanRemoval=false)
     */
    private $bills;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\FlatRate", mappedBy="customer", cascade={"persist", "remove"}, orphanRemoval=true)
     */
    private $flatRates;

    /**
     * @ORM\Column(type="boolean")
     */
    private $newsletter;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * 
     * @Assert\File(
     *      maxSize = "5120k",
     *      mimeTypes={ "image/jpeg", "image/png", "image/jpg"},
     *      mimeTypesMessage = "Please upload a valid PDF"
     *      
     * )
     */
    private $picture = "/uploads/pictures/user.png";

    public function __construct()
    {
        $this->bills = new ArrayCollection();
        $this->flatRates = new ArrayCollection();
    }

    public function getId(): ? int
    {
        return $this->id;
    }

    public function getFirstname(): ? string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ? string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPhone(): ? string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ? string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAddressNumber(): ? string
    {
        return $this->addressNumber;
    }

    public function setAddressNumber(? string $addressNumber): self
    {
        $this->addressNumber = $addressNumber;

        return $this;
    }

    public function getStreetNumber(): ? string
    {
        return $this->streetNumber;
    }

    public function setStreetNumber(? string $streetNumber): self
    {
        $this->streetNumber = $streetNumber;

        return $this;
    }

    public function getStreetName(): ? string
    {
        return $this->streetName;
    }

    public function setStreetName(? string $streetName): self
    {
        $this->streetName = $streetName;

        return $this;
    }

    public function getCity(): ? string
    {
        return $this->city;
    }

    public function setCity(? string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPc(): ? string
    {
        return $this->pc;
    }

    public function setPc(? string $pc): self
    {
        $this->pc = $pc;

        return $this;
    }

    public function getCountry(): ? string
    {
        return $this->country;
    }

    public function setCountry(? string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getBuilding(): ? string
    {
        return $this->building;
    }

    public function setBuilding(? string $building): self
    {
        $this->building = $building;

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
            $bill->setCustomer($this);
        }

        return $this;
    }

    public function removeBill(Bill $bill): self
    {
        if ($this->bills->contains($bill)) {
            $this->bills->removeElement($bill);
            // set the owning side to null (unless already changed)
            if ($bill->getCustomer() === $this) {
                $bill->setCustomer(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ? \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

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

    public function getNewsletter(): ? bool
    {
        return $this->newsletter;
    }

    public function setNewsletter(bool $newsletter): self
    {
        $this->newsletter = $newsletter;

        return $this;
    }

    public function getPicture(): ? string
    {
        return $this->picture;
    }

    public function setPicture(? string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }
}
