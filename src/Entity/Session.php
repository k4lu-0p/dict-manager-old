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
     * @ORM\ManyToOne(targetEntity="App\Entity\FlatRate", inversedBy="sessions",  cascade={"persist", "remove"})
     */
    private $flatRate;

    public function getId(): ? int
    {
        return $this->id;
    }

    public function getDate(): ? \DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getFree(): ? bool
    {
        return $this->free;
    }

    public function setFree(bool $free): self
    {
        $this->free = $free;

        return $this;
    }

    public function getFlatRate(): ? FlatRate
    {
        return $this->flatRate;
    }

    public function setFlatRate(? FlatRate $flatRate): self
    {
        $this->flatRate = $flatRate;

        return $this;
    }
}
