<?php

namespace App\Repository;

use App\Entity\Session;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Session|null find($id, $lockMode = null, $lockVersion = null)
 * @method Session|null findOneBy(array $criteria, array $orderBy = null)
 * @method Session[]    findAll()
 * @method Session[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SessionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Session::class);
    }

    public function findByFlatRateAsc(): array
    {
        $qb = $this->createQueryBuilder('s');

        return $qb->select(['s', 'f'])
            ->innerJoin('s.flatRate', 'f')
            ->orderBy('f.id', 'ASC')
            ->distinct()
            ->getQuery()
            ->getArrayResult();
    }

    public function findSessionsByCurrentWeek($currentWeek): array
    {

        $connexion = $this->getEntityManager()->getConnection();

        $sql = "SELECT (SELECT WEEK(ADDDATE(date,5-DAYOFWEEK(date)),3)) as week, 
                DAYNAME(date) as day, 
                COUNT(*) AS session FROM `session`
                WHERE (SELECT WEEK(ADDDATE(date,5-DAYOFWEEK(date)),3)) = (WEEK(CURRENT_DATE) + 1)
                GROUP BY week, day";

        $req = $connexion->prepare($sql);
        $req->bindValue(1, $currentWeek);
        $req->execute();

        return $req->fetchAll();
    }

    public function findSessionsOfCurrentMonth($week): array
    {

        $connexion = $this->getEntityManager()->getConnection();

        $sql = "SELECT (SELECT WEEK(ADDDATE(date,5-DAYOFWEEK(date)),3)) as week, 
                COUNT(*) AS session FROM `session`
                WHERE (SELECT WEEK(ADDDATE(date,5-DAYOFWEEK(date)),3)) = ?
                GROUP BY week";

        $req = $connexion->prepare($sql);
        $req->bindValue(1, $week);
        $req->execute();

        return $req->fetchAll();
    }

    public function findSessionsOfCurrentYear()
    {
        $connexion = $this->getEntityManager()->getConnection();
        $sql = "SELECT MONTHNAME(date) AS month, COUNT(*) AS session FROM session GROUP BY month";
        $req = $connexion->prepare($sql);
        $req->execute();
        return $req->fetchAll();
    }

    // /**
    //  * @return Session[] Returns an array of Session objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Session
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
