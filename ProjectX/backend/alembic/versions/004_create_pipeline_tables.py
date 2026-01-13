"""create pipeline tables

Revision ID: 004_create_pipeline_tables
Revises: 003_create_phase3_tables
Create Date: 2026-01-12 14:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '004_create_pipeline_tables'
down_revision = '003_create_phase3_tables'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 1. Create pipelines table
    op.create_table(
        'pipelines',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('organization_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('is_default', sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_pipelines_id'), 'pipelines', ['id'], unique=False)
    op.create_index(op.f('ix_pipelines_name'), 'pipelines', ['name'], unique=False)

    # 2. Create pipeline_stages table
    op.create_table(
        'pipeline_stages',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('pipeline_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('color', sa.String(), nullable=True),
        sa.Column('order', sa.Integer(), nullable=True),
        sa.Column('is_system_stage', sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(['pipeline_id'], ['pipelines.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_pipeline_stages_id'), 'pipeline_stages', ['id'], unique=False)

    # 3. Add foreign keys to leads table
    op.add_column('leads', sa.Column('pipeline_id', sa.Integer(), nullable=True))
    op.add_column('leads', sa.Column('stage_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'leads', 'pipelines', ['pipeline_id'], ['id'])
    op.create_foreign_key(None, 'leads', 'pipeline_stages', ['stage_id'], ['id'])


def downgrade() -> None:
    op.drop_constraint(None, 'leads', type_='foreignkey')
    op.drop_constraint(None, 'leads', type_='foreignkey')
    op.drop_column('leads', 'stage_id')
    op.drop_column('leads', 'pipeline_id')
    op.drop_index(op.f('ix_pipeline_stages_id'), table_name='pipeline_stages')
    op.drop_table('pipeline_stages')
    op.drop_index(op.f('ix_pipelines_name'), table_name='pipelines')
    op.drop_index(op.f('ix_pipelines_id'), table_name='pipelines')
    op.drop_table('pipelines')
