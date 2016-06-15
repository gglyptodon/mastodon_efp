# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0008_geneset'),
    ]

    operations = [
        migrations.AddField(
            model_name='geneset',
            name='display_name',
            field=models.CharField(default='dummy', max_length=200),
            preserve_default=False,
        ),
    ]
