<?php

namespace App\Repository;

use App\Entity\Bill;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Bill|null find($id, $lockMode = null, $lockVersion = null)
 * @method Bill|null findOneBy(array $criteria, array $orderBy = null)
 * @method Bill[]    findAll()
 * @method Bill[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BillRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Bill::class);
    }





    // Cherche les clients par rapport aux factures
    public function findBySearch(string $search)
    {

        $qb = $this->createQueryBuilder('b');

        return $qb->select(['b', 'c'])
            ->innerJoin('b.customer', 'c')
            ->where('c.lastname LIKE :val')
            ->orWhere('c.firstname LIKE :val')
            ->setParameter('val', '%' . $search . '%')
            ->orderBy('c.lastname', 'ASC')
            ->distinct()
            ->getQuery()
            ->getArrayResult();
    }






    // /**
    //  * @return Bill[] Returns an array of Bill objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Bill
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
