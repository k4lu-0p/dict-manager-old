<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

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
     * @ORM\Column(type="boolean")
     */
    private $free;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\FlatRate", inversedBy="sessions",  cascade={"persist", "remove"})
     */
    private $flatRate;

    /**
     * @Assert\NotBlank
     * @Assert\DateTime
     * @var string A "d-m-Y H:i:s" formatted value
     * @ORM\Column(type="datetime")
     */
    private $dateStart;

    /**
     * 
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateEnd;

    public function getId(): ? int
    {
        return $this->id;
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

    public function getDateStart(): ?\DateTimeInterface
    {
        return $this->dateStart;
    }

    public function setDateStart(\DateTimeInterface $dateStart): self
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getDateEnd(): ?\DateTimeInterface
    {
        return $this->dateEnd;
    }

    public function setDateEnd(?\DateTimeInterface $dateEnd): self
    {
        $this->dateEnd = $dateEnd;

        return $this;
    }

    
}
