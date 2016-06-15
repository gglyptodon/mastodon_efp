# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0007_tpm_csv_source_json_tpm'),
    ]

    operations = [
        migrations.CreateModel(
            name='GeneSet',
            fields=[
                ('source_csv', models.FileField(null=True, upload_to=b'', blank=True)),
                ('members', models.TextField(null=True, blank=True)),
                ('name', models.CharField(max_length=200, serialize=False, primary_key=True)),
                ('description', models.TextField(null=True, blank=True)),
            ],
        ),
    ]
