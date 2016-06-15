# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('efp', '0009_geneset_display_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='geneset',
            name='members_name',
            field=models.TextField(null=True, blank=True),
        ),
    ]
