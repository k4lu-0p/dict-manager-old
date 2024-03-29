<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BillRepository")
 * orphanRemoval=false 
 */
class Bill
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * 
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $tax;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="bills")
     */
    private $customer;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\FlatRate", inversedBy="bill", cascade={"persist", "remove"})
     */
    private $flatRate;

    public function getId(): ? int
    {
        return $this->id;
    }

    public function getTax(): ? int
    {
        return $this->tax;
    }

    public function setTax(int $tax): self
    {
        $this->tax = $tax;

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

    public function getCreatedAt(): ? \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getFlatRate(): ? FlatRate
    {
        return $this->flatRate;
    }

    public function setFlatRate(FlatRate $flatRate): self
    {
        $this->flatRate = $flatRate;

        return $this;
    }
}
