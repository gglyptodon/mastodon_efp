# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gene',
            name='expression_TPM_Li_totalS4',
        ),
    ]