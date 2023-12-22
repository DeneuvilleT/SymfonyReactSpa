<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231221200237 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE line_orders (id INT AUTO_INCREMENT NOT NULL, product_id INT DEFAULT NULL, order_id_id INT DEFAULT NULL, amount NUMERIC(20, 6) NOT NULL, INDEX IDX_9161AB534584665A (product_id), INDEX IDX_9161AB53FCDAEAAA (order_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE line_orders ADD CONSTRAINT FK_9161AB534584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('ALTER TABLE line_orders ADD CONSTRAINT FK_9161AB53FCDAEAAA FOREIGN KEY (order_id_id) REFERENCES orders (id)');
        $this->addSql('ALTER TABLE orders ADD status VARCHAR(50) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE line_orders DROP FOREIGN KEY FK_9161AB534584665A');
        $this->addSql('ALTER TABLE line_orders DROP FOREIGN KEY FK_9161AB53FCDAEAAA');
        $this->addSql('DROP TABLE line_orders');
        $this->addSql('ALTER TABLE orders DROP status');
    }
}
