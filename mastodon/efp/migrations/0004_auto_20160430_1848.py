# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0003_remove_gene_expression_tpm_li_lmds14'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gene',
            name='FDR_John_BS_vs_M',
        ),
        migrations.RemoveField(
            model_name='gene',
            name='FDR_Rao_BS_vs_M',
        ),
        migrations.RemoveField(
            model_name='gene',
            name='expression_TPM_John_BS',
        ),
        migrations.RemoveField(
            model_name='gene',
            name='expression_TPM_John_M',
        ),
        migrations.RemoveField(
            model_name='gene',
            name='expression_TPM_Rao_BS',
        ),
        migrations.RemoveField(
            model_name='gene',
            name='expression_TPM_Rao_M',
        ),
    ]
