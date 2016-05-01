# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import efp.utils


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FDR_csv',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('source_csv_FDR', models.FileField(null=True, upload_to=b'', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Gene',
            fields=[
                ('maize_name', models.CharField(max_length=200, unique=True, serialize=False, primary_key=True)),
                ('setaria_name', models.CharField(max_length=200, null=True, blank=True)),
                ('panicum_name', models.CharField(max_length=200, null=True, blank=True)),
                ('annotation', models.TextField(null=True, blank=True)),
                ('tags', models.TextField(null=True, blank=True)),
                ('expression_TPM', efp.utils.JSONField(null=True, blank=True)),
                ('expression_TPM_Tausta_BSS4', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Tausta_MS4', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Tausta_BSS9', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Tausta_MS9', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Tausta_BSS14', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Tausta_MS14', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Chang_BS', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Chang_M', models.FloatField(null=True, blank=True)),
                ('expression_TPM_John_BS', models.FloatField(null=True, blank=True)),
                ('expression_TPM_John_M', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Li_LMDS14', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Li_totalS14', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Li_totalS4', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Li_totalS9', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Rao_BS', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Rao_M', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_BSS1', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_BSS2', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_BSS3', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_BSS4', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_BSS5', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_MS1', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_MS2', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_MS3', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_MS4', models.FloatField(null=True, blank=True)),
                ('expression_TPM_Denton_MS5', models.FloatField(null=True, blank=True)),
                ('M_vs_BS_FDR', efp.utils.JSONField(null=True, blank=True)),
                ('FDR_Tausta_BSS4_vs_MS4', models.FloatField(null=True, blank=True)),
                ('FDR_Tausta_BSS9_vs_MS9', models.FloatField(null=True, blank=True)),
                ('FDR_Tausta_BSS14_vs_MS14', models.FloatField(null=True, blank=True)),
                ('FDR_Chang_BS_vs_M', models.FloatField(null=True, blank=True)),
                ('FDR_John_BS_vs_M', models.FloatField(null=True, blank=True)),
                ('FDR_Li_LMDS14_vs_totalS14', models.FloatField(null=True, blank=True)),
                ('FDR_Rao_BS_vs_M', models.FloatField(null=True, blank=True)),
                ('FDR_Denton_BSS5_vs_MS5', models.FloatField(null=True, blank=True)),
                ('FDR_Denton_BSS4_vs_MS4', models.FloatField(null=True, blank=True)),
                ('FDR_Denton_BSS3_vs_MS3', models.FloatField(null=True, blank=True)),
                ('FDR_Denton_BSS2_vs_MS2', models.FloatField(null=True, blank=True)),
                ('FDR_Denton_BSS1_vs_MS1', models.FloatField(null=True, blank=True)),
                ('source_fdr', models.ForeignKey(blank=True, to='efp.FDR_csv', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='TPM_csv',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('source_csv_TPM', models.FileField(null=True, upload_to=b'', blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='gene',
            name='source_tpm',
            field=models.ForeignKey(blank=True, to='efp.TPM_csv', null=True),
        ),
    ]
