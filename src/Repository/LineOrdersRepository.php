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
}
