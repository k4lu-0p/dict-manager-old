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
    private $session_number;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_start;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $date_end;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Session", mappedBy="flatRate", cascade={"persist", "remove"})
     */
    private $sessions;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="flatRates",  cascade={"persist", "remove"})
     */
    private $customer;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Bill", mappedBy="flatRate", cascade={"persist", "remove"})
     */
    private $bill;

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
        return $this->session_number;
    }

    public function setSessionNumber(int $session_number): self
    {
        $this->session_number = $session_number;

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

    public function getDateStart(): ? \DateTimeInterface
    {
        return $this->date_start;
    }

    public function setDateStart(\DateTimeInterface $date_start): self
    {
        $this->date_start = $date_start;

        return $this;
    }

    public function getDateEnd(): ? \DateTimeInterface
    {
        return $this->date_end;
    }

    public function setDateEnd(? \DateTimeInterface $date_end): self
    {
        $this->date_end = $date_end;

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

    public function getBill(): ?Bill
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
}
