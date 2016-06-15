# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0005_gene_expression_tpm_li_totals4'),
    ]

    operations = [
        migrations.AddField(
            model_name='fdr_csv',
            name='name',
            field=models.CharField(default='example', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tpm_csv',
            name='name',
            field=models.CharField(default='example', max_length=100),
            preserve_default=False,
        ),
    ]
