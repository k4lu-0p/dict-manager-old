<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SessionRepository")
 */
class Session
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $free;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\FlatRate", inversedBy="sessions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $flat_rate;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getFree(): ?bool
    {
        return $this->free;
    }

    public function setFree(bool $free): self
    {
        $this->free = $free;

        return $this;
    }

    public function getFlatRate(): ?FlatRate
    {
        return $this->flat_rate;
    }

    public function setFlatRate(?FlatRate $flat_rate): self
    {
        $this->flat_rate = $flat_rate;

        return $this;
    }
}
