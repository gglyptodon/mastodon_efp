# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0006_auto_20160502_1216'),
    ]

    operations = [
        migrations.AddField(
            model_name='tpm_csv',
            name='source_json_TPM',
            field=models.TextField(null=True, blank=True),
        ),
    ]
