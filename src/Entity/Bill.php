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
    private $created_at;

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }
}
