"""create phase 3 tables

Revision ID: 003
Revises: 002
Create Date: 2024-03-20 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '003'
down_revision = '002'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # 1. Create Property Data table (Deep Recon)
    op.create_table(
        'property_data',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('lead_id', sa.Integer(), nullable=False),
        sa.Column('sqft', sa.Integer(), nullable=True),
        sa.Column('lot_size', sa.Float(), nullable=True),
        sa.Column('year_built', sa.Integer(), nullable=True),
        sa.Column('bedrooms', sa.Integer(), nullable=True),
        sa.Column('bathrooms', sa.Float(), nullable=True),
        sa.Column('estimated_value', sa.Integer(), nullable=True),
        sa.Column('last_sold_date', sa.DateTime(), nullable=True),
        sa.Column('last_sold_price', sa.Integer(), nullable=True),
        sa.Column('tax_history', sa.JSON(), nullable=True),
        sa.Column('linkedin_url', sa.String(), nullable=True),
        sa.Column('job_title', sa.String(), nullable=True),
        sa.Column('company_name', sa.String(), nullable=True),
        sa.Column('verified_email', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['lead_id'], ['leads.id'], ),
        sa.UniqueConstraint('lead_id')
    )
    op.create_index(op.f('ix_property_data_id'), 'property_data', ['id'], unique=False)

    # 2. Create Vision Scans table
    op.create_table(
        'vision_scans',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('lead_id', sa.Integer(), nullable=False),
        sa.Column('image_url', sa.String(), nullable=False),
        sa.Column('analyzed_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('detected_equipment', sa.String(), nullable=True),
        sa.Column('damage_assessment', sa.Text(), nullable=True),
        sa.Column('rough_estimate_min', sa.Integer(), nullable=True),
        sa.Column('rough_estimate_max', sa.Integer(), nullable=True),
        sa.Column('raw_analysis_json', sa.JSON(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['lead_id'], ['leads.id'], )
    )
    op.create_index(op.f('ix_vision_scans_id'), 'vision_scans', ['id'], unique=False)

    # 3. Create SEO Jobs table
    op.create_table(
        'seo_jobs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('lead_id', sa.Integer(), nullable=False),
        sa.Column('original_photo_url', sa.String(), nullable=False),
        sa.Column('target_keywords', sa.String(), nullable=True),
        sa.Column('gps_latitude', sa.Float(), nullable=True),
        sa.Column('gps_longitude', sa.Float(), nullable=True),
        sa.Column('processed_photo_url', sa.String(), nullable=True),
        sa.Column('posted_to_gmb', sa.Boolean(), nullable=True),
        sa.Column('posted_to_yelp', sa.Boolean(), nullable=True),
        sa.Column('gmb_post_url', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['lead_id'], ['leads.id'], )
    )
    op.create_index(op.f('ix_seo_jobs_id'), 'seo_jobs', ['id'], unique=False)

def downgrade() -> None:
    op.drop_index(op.f('ix_seo_jobs_id'), table_name='seo_jobs')
    op.drop_table('seo_jobs')
    op.drop_index(op.f('ix_vision_scans_id'), table_name='vision_scans')
    op.drop_table('vision_scans')
    op.drop_index(op.f('ix_property_data_id'), table_name='property_data')
    op.drop_table('property_data')
