<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231221200405 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE line_orders DROP FOREIGN KEY FK_9161AB53FCDAEAAA');
        $this->addSql('DROP INDEX IDX_9161AB53FCDAEAAA ON line_orders');
        $this->addSql('ALTER TABLE line_orders CHANGE order_id_id order_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE line_orders ADD CONSTRAINT FK_9161AB538D9F6D38 FOREIGN KEY (order_id) REFERENCES orders (id)');
        $this->addSql('CREATE INDEX IDX_9161AB538D9F6D38 ON line_orders (order_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE line_orders DROP FOREIGN KEY FK_9161AB538D9F6D38');
        $this->addSql('DROP INDEX IDX_9161AB538D9F6D38 ON line_orders');
        $this->addSql('ALTER TABLE line_orders CHANGE order_id order_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE line_orders ADD CONSTRAINT FK_9161AB53FCDAEAAA FOREIGN KEY (order_id_id) REFERENCES orders (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_9161AB53FCDAEAAA ON line_orders (order_id_id)');
    }
}
