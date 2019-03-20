<?php

namespace App\Repository;

use App\Entity\Customer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Customer|null find($id, $lockMode = null, $lockVersion = null)
 * @method Customer|null findOneBy(array $criteria, array $orderBy = null)
 * @method Customer[]    findAll()
 * @method Customer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CustomerRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Customer::class);
    }

    public function findAllByAlphabeticalLastName()
    {
        $qb = $this->createQueryBuilder('c');

        return $qb->select('c')
            ->orderBy('c.lastname', 'ASC')
            ->distinct()
            ->getQuery()
            ->getArrayResult();
    }

    public function findAllBySubscribeDate()
    {
        $qb = $this->createQueryBuilder('c');

        return $qb->select('c')
            ->orderBy('c.createdAt', 'DESC')
            ->distinct()
            ->getQuery()
            ->getArrayResult();
    }

    public function findBySearch(string $search)
    {

        $qb = $this->createQueryBuilder('c');

        return $qb->select('c')
            ->where('c.lastname LIKE :val')
            ->orWhere('c.firstname LIKE :val')
            ->setParameter('val', '%' . $search . '%')
            ->orderBy('c.lastname', 'ASC')
            ->distinct()
            ->getQuery()
            ->getArrayResult();
    }

    // /**
    //  * @return Customer[] Returns an array of Customer objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Customer
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
