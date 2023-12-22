<?php

namespace App\Repository;

use App\Entity\LineOrders;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LineOrders>
 *
 * @method LineOrders|null find($id, $lockMode = null, $lockVersion = null)
 * @method LineOrders|null findOneBy(array $criteria, array $orderBy = null)
 * @method LineOrders[]    findAll()
 * @method LineOrders[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LineOrdersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LineOrders::class);
    }

//    /**
//     * @return LineOrders[] Returns an array of LineOrders objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('l.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?LineOrders
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
