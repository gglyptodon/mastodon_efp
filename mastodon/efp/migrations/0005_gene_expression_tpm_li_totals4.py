# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0004_auto_20160430_1848'),
    ]

    operations = [
        migrations.AddField(
            model_name='gene',
            name='expression_TPM_Li_totalS4',
            field=models.FloatField(null=True, blank=True),
        ),
    ]
