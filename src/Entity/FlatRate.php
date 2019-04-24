<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FlatRateRepository")
 */
class FlatRate
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $sessionNumber;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;


    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Session", mappedBy="flatRate", cascade={"persist", "remove"}, orphanRemoval=true)
     */
    private $sessions;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="flatRates")
     */
    private $customer;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Bill", mappedBy="flatRate", cascade={"persist", "remove"})
     */
    private $bill;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    public function __construct()
    {
        $this->sessions = new ArrayCollection();
    }

    public function getId(): ? int
    {
        return $this->id;
    }

    public function getSessionNumber(): ? int
    {
        return $this->sessionNumber;
    }

    public function setSessionNumber(int $sessionNumber): self
    {
        $this->sessionNumber = $sessionNumber;

        return $this;
    }

    public function getPrice(): ? int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|Session[]
     */
    public function getSessions(): Collection
    {
        return $this->sessions;
    }

    public function addSession(Session $session): self
    {
        if (!$this->sessions->contains($session)) {
            $this->sessions[] = $session;
            $session->setFlatRate($this);
        }

        return $this;
    }

    public function removeSession(Session $session): self
    {
        if ($this->sessions->contains($session)) {
            $this->sessions->removeElement($session);
            // set the owning side to null (unless already changed)
            if ($session->getFlatRate() === $this) {
                $session->setFlatRate(null);
            }
        }

        return $this;
    }

    public function getCustomer(): ? Customer
    {
        return $this->customer;
    }

    public function setCustomer(? Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getBill(): ? Bill
    {
        return $this->bill;
    }

    public function setBill(Bill $bill): self
    {
        $this->bill = $bill;

        // set the owning side of the relation if necessary
        if ($this !== $bill->getFlatRate()) {
            $bill->setFlatRate($this);
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
