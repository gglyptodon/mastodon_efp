from django.db import models
from .utils import JSONField
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime
from uuid import uuid4
import json
from django.core import serializers

class TPM_csv(models.Model):
    source_csv_TPM = models.FileField(null=True, blank=True)
    name = models.CharField(max_length=100)
    source_json_TPM = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return self.name



class FDR_csv(models.Model):
    source_csv_FDR = models.FileField(null=True, blank=True)
    name = models.CharField(max_length=100)
    def __unicode__(self):
        return self.name
#
# class Set_csv(models.Model):
#    """ model for csv file for multi gene sets, etc conflict sets. Triggers postsave for populating source_json_set """
#    source_csv_set = models.FileField(null=True, blank=True)
#    name = models.CharField(max_length=100)
# #    source_json_set = models.TextField(blank=True, null=True)


class GeneSet(models.Model):
    """Triggers post_save and get its members (Gene) as json from the csv to members field; Gene instances must exist beforehand """
    source_csv = models.FileField(null=True, blank=True)
    members = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=200, primary_key=True)
    display_name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return self.name




class Gene(models.Model):
    """
    Tausta_2014.BS.Section_4",
    "Tausta_2014.BS.Section_9",
    "Tausta_2014.BS.Section_14",
    "Chang_2012.BS",
    "Denton_2016.BS.Slice_5",
    "Denton_2016.BS.Slice_4",
    "Denton_2016.BS.Slice_3",
    "Denton_2016.BS.Slice_2",
    "Denton_2016.BS.Slice_1",
    "Tausta_2014.M.Section_4",
    "Tausta_2014.M.Section_9",
    "Tausta_2014.M.Section_14",
    "Chang_2012.M",
    "Denton_2016.M.Slice_5",
    "Denton_2016.M.Slice_4",
    "Denton_2016.M.Slice_3",
    "Denton_2016.M.Slice_2",
    "Denton_2016.M.Slice_1",
    "Li_2010.total.Section_4",
    "Li_2010.total.Section_9",
    "Li_2010.total.Section_14"
    """


    maize_name = models.CharField(max_length=200, unique=True, primary_key=True)
    setaria_name = models.CharField(max_length=200, null=True, blank=True)
    panicum_name = models.CharField(max_length=200, null=True, blank=True)
    annotation = models.TextField(null=True, blank=True)
    tags = models.TextField(null=True, blank=True)

    expression_TPM = JSONField(null=True, blank=True)
    expression_TPM_Tausta_BSS4 = models.FloatField(null=True, blank=True)
    expression_TPM_Tausta_MS4 = models.FloatField(null=True, blank=True)
    expression_TPM_Tausta_BSS9 = models.FloatField(null=True, blank=True)
    expression_TPM_Tausta_MS9 = models.FloatField(null=True, blank=True)
    expression_TPM_Tausta_BSS14 = models.FloatField(null=True, blank=True)
    expression_TPM_Tausta_MS14  = models.FloatField(null=True, blank=True)

    expression_TPM_Chang_BS = models.FloatField(null=True, blank=True)
    expression_TPM_Chang_M = models.FloatField(null=True, blank=True)

    # expression_TPM_John_BS = models.FloatField(null=True, blank=True)
    # expression_TPM_John_M = models.FloatField(null=True, blank=True)

    #expression_TPM_Li_LMDS14  = models.FloatField(null=True, blank=True)
    expression_TPM_Li_totalS14 = models.FloatField(null=True, blank=True)
    expression_TPM_Li_totalS4 = models.FloatField(null=True, blank=True)
    expression_TPM_Li_totalS9 = models.FloatField(null=True, blank=True)

    # expression_TPM_Rao_BS = models.FloatField(null=True, blank=True)
    # expression_TPM_Rao_M = models.FloatField(null=True, blank=True)

    expression_TPM_Denton_BSS1= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_BSS2= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_BSS3= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_BSS4= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_BSS5= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_MS1= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_MS2= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_MS3= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_MS4= models.FloatField(null=True, blank=True)
    expression_TPM_Denton_MS5= models.FloatField(null=True, blank=True)


    M_vs_BS_FDR = JSONField(null=True, blank=True)
    FDR_Tausta_BSS4_vs_MS4 =models.FloatField(null=True, blank=True)
    FDR_Tausta_BSS9_vs_MS9=models.FloatField(null=True, blank=True)
    FDR_Tausta_BSS14_vs_MS14=models.FloatField(null=True, blank=True)
    FDR_Chang_BS_vs_M=models.FloatField(null=True, blank=True)
    # FDR_John_BS_vs_M=models.FloatField(null=True, blank=True)
    FDR_Li_LMDS14_vs_totalS14=models.FloatField(null=True, blank=True)
    # FDR_Rao_BS_vs_M=models.FloatField(null=True, blank=True)
    FDR_Denton_BSS5_vs_MS5=models.FloatField(null=True, blank=True)
    FDR_Denton_BSS4_vs_MS4=models.FloatField(null=True, blank=True)
    FDR_Denton_BSS3_vs_MS3=models.FloatField(null=True, blank=True)
    FDR_Denton_BSS2_vs_MS2=models.FloatField(null=True, blank=True)
    FDR_Denton_BSS1_vs_MS1=models.FloatField(null=True, blank=True)

    source_tpm = models.ForeignKey(to=TPM_csv, null=True, blank=True)
    source_fdr = models.ForeignKey(to=FDR_csv, null=True, blank=True)
    #  keys:
    # "Tausta_BSS4_vs_MS4", "Tausta_BSS9_vs_MS9", Tausta_BSS14_vs_MS14"
    # "Chang_BS_vs_M",
    # "John_BS_vs_M",
    # "Li_LMDS14_vs_totalS14",
    # "Rao_BS_vs_M",
    # "Denton_BSS5_vs_MS5", "Denton_BSS5_vs_MS5"
    # "Denton_BSS4_vs_MS4",	"Denton_BSS3_vs_MS3"
    # "Denton_BSS2_vs_MS2",	"Denton_BSS1_vs_MS1"
    #
    # Denton_BSS5, Denton_BSS4, Denton_BSS3, Denton_BSS2, Denton_BSS1,
    # Denton_MS5, Denton_MS4, Denton_MS3, Denton_MS2, Denton_MS1,
    # Tausta_BSS4, Tausta_BSS9, Tausta_BSS14
    # Tausta_MS4, Tausta_MS9, Tausta_MS14

#class DataSet(models.model):
#    csv = models.FileField(upload_to=make_unique_directory_path)
    def __unicode__(self):
        return self.maize_name

    def toJson(self):
        return json.dumps(self.__dict__)


@receiver(post_save, sender=TPM_csv)
def tpm_to_json(sender,  created, **kwargs):
    inst = kwargs.get('instance')
    csv = inst.source_csv_TPM._get_path()
    res = []
    if created:
        with open(csv,'r') as infile:
            headers = [r.strip().strip('"') for r in infile.readline().strip().split(",")]
            if not headers[0]:
                headers[0] = "maize_name"
            for l in infile:
                l = [x.strip().strip('"') for x in l.strip().strip('"').split(",")]
                res.append(dict(zip(headers,l)))
        print("res",res)
        inst.source_json_TPM = json.dumps(res)
        inst.save()



@receiver(post_save, sender=TPM_csv)
def init_tpm(sender, **kwargs):
    inst = kwargs.get('instance')
    csv = inst.source_csv_TPM._get_path()
    idmapper = {}
    """
    Tausta_2014.BS.Section_4",
    "Tausta_2014.BS.Section_9",
    "Tausta_2014.BS.Section_14",
    "Chang_2012.BS",
    "Denton_2016.BS.Slice_5",
    "Denton_2016.BS.Slice_4",
    "Denton_2016.BS.Slice_3",
    "Denton_2016.BS.Slice_2",
    "Denton_2016.BS.Slice_1",
    "Tausta_2014.M.Section_4",
    "Tausta_2014.M.Section_9",
    "Tausta_2014.M.Section_14",
    "Chang_2012.M",
    "Denton_2016.M.Slice_5",
    "Denton_2016.M.Slice_4",
    "Denton_2016.M.Slice_3",
    "Denton_2016.M.Slice_2",
    "Denton_2016.M.Slice_1",
    "Li_2010.total.Section_4",
    "Li_2010.total.Section_9",
    "Li_2010.total.Section_14"


    """
    with open(csv, 'r') as incsv:
        header = incsv.readline().strip()
        header = [x.strip('"').strip() for x in header.split(',')]
        for i,v in enumerate(header):
            idmapper[v] = i
        for l in incsv:
            l = l.strip('\n')
            print(l.strip().split(","))
            vals = [x.strip('"').strip() for x in l.split(",")]
            for k,v in idmapper.items():
                print(k,v)
                if k == "Tausta_2014.BS.Section_4":
                    expression_TPM_Tausta_BSS4 = vals[v]
                elif k == "Tausta_2014.BS.Section_9":
                    expression_TPM_Tausta_BSS9 = vals[v]
                elif k == "Tausta_2014.BS.Section_14":
                    expression_TPM_Tausta_BSS14 = vals[v]
                elif k == "Chang_2012.BS":
                    expression_TPM_Chang_BS = vals[v]
                elif k == "Denton_2016.BS.Slice_5":
                   expression_TPM_Denton_BSS5 = vals[v]
                elif k == "Denton_2016.BS.Slice_4":
                    expression_TPM_Denton_BSS4 = vals[v]
                elif k == "Denton_2016.BS.Slice_3":
                    expression_TPM_Denton_BSS3 = vals[v]
                elif k == "Denton_2016.BS.Slice_2":
                    expression_TPM_Denton_BSS2 = vals[v]
                elif k == "Denton_2016.BS.Slice_1":
                    expression_TPM_Denton_BSS1 = vals[v]
                elif k == "Tausta_2014.M.Section_4":
                    expression_TPM_Tausta_MS4 = vals[v]
                elif k == "Tausta_2014.M.Section_9":
                    expression_TPM_Tausta_MS9 = vals[v]
                elif k == "Tausta_2014.M.Section_14":
                    expression_TPM_Tausta_MS14 = vals[v]
                elif k == "Chang_2012.M":
                    expression_TPM_Chang_M = vals[v]
                elif k == "Denton_2016.M.Slice_5":
                    expression_TPM_Denton_MS5 = vals[v]
                elif k == "Denton_2016.M.Slice_4":
                    expression_TPM_Denton_MS4 = vals[v]
                elif k == "Denton_2016.M.Slice_3":
                    expression_TPM_Denton_MS3 =  vals[v]
                elif k == "Denton_2016.M.Slice_2":
                    expression_TPM_Denton_MS2 =  vals[v]
                elif k == "Denton_2016.M.Slice_1":
                    expression_TPM_Denton_MS1 =  vals[v]
                elif k == "Li_2010.total.Section_4":
                    expression_TPM_Li_totalS4 = vals[v]
                elif k == "Li_2010.total.Section_9":
                    expression_TPM_Li_totalS9 = vals[v]
                elif k == "Li_2010.total.Section_14":
                    expression_TPM_Li_totalS14 = vals[v]
            #print(expression_TPM_Li_totalS4)
            newgene = Gene()
            newgene.maize_name = vals[0]
            #newgene.expression_TPM_Li_totalS4 = expression_TPM_Li_totalS4
            print("newgene",newgene)
            newgene.expression_TPM_Tausta_BSS14 = expression_TPM_Tausta_BSS14
            newgene.expression_TPM_Tausta_BSS4 = expression_TPM_Tausta_BSS4
            newgene.expression_TPM_Tausta_BSS9 = expression_TPM_Tausta_BSS9
            newgene.expression_TPM_Tausta_MS14 = expression_TPM_Tausta_MS14
            newgene.expression_TPM_Tausta_MS4 = expression_TPM_Tausta_MS4
            newgene.expression_TPM_Tausta_MS9 = expression_TPM_Tausta_MS9
            newgene.expression_TPM_Chang_BS = expression_TPM_Chang_BS
            newgene.expression_TPM_Chang_M = expression_TPM_Chang_M
            newgene.expression_TPM_Denton_BSS1 = expression_TPM_Denton_BSS1
            newgene.expression_TPM_Denton_BSS2 = expression_TPM_Denton_BSS2
            newgene.expression_TPM_Denton_BSS3 = expression_TPM_Denton_BSS3
            newgene.expression_TPM_Denton_BSS4 = expression_TPM_Denton_BSS4
            newgene.expression_TPM_Denton_BSS5 = expression_TPM_Denton_BSS5

            newgene.expression_TPM_Denton_MS1 = expression_TPM_Denton_MS1
            newgene.expression_TPM_Denton_MS2 = expression_TPM_Denton_MS2
            newgene.expression_TPM_Denton_MS3 = expression_TPM_Denton_MS3
            newgene.expression_TPM_Denton_MS4 = expression_TPM_Denton_MS4
            newgene.expression_TPM_Denton_MS5 = expression_TPM_Denton_MS5

           # newgene.expression_TPM_Li_LMDS14 = expression_TPM_Li_LMDS14
            newgene.expression_TPM_Li_totalS14 = expression_TPM_Li_totalS14
            newgene.expression_TPM_Li_totalS9 = expression_TPM_Li_totalS9
            newgene.expression_TPM_Li_totalS4 = expression_TPM_Li_totalS4
            #todo s4


            newgene.source_tpm = inst
            newgene.save()

# @receiver(post_save, sender=FDR_csv)
# def init_fdr(sender, **kwargs):
#     inst = kwargs.get('instance')
#     csv = inst.source_csv_FDR._get_path()
#     with open(csv, 'r') as incsv:
#         header = incsv.readline()
#         print(header.split(","))
#         #for l in incsv:
#         #    vals = l.split(",")
#         #    for k,v in id

@receiver(post_save, sender=GeneSet)
def set_csv_populate_members(sender, created, **kwargs):
    """ Populate members from csv for GeneSet """
    # open csv, csv has only maize identifiers
    inst = kwargs.get('instance')
    csv = inst.source_csv._get_path()
    res = []
    if created:
        with open(csv, 'r') as infile:
            for l in infile:
                l = l.strip()
                obj = Gene.objects.get(maize_name = l)
                res.append(obj)#.toJson())

        #resjson = json.dumps(obj)
        data = serializers.serialize("json", res)
        print(res, len(res))
        inst.members = data
        inst.save()


#@receiver(post_save, sender = Set_csv)
# def set_to_json(sender, created, **kwargs):
#     """ save json: array of objects todo"""
#     # todo adjust for set! depends on what csv looks like
#
#     inst = kwargs.get('instance')
#     csv = inst.source_csv_set._get_path()
#     res = []
#     if created:
#         with open(csv, 'r') as infile:
#             headers = [r.strip().strip('"') for r in infile.readline().strip().split(",")]
#             if not headers[0]:
#                 headers[0] = "maize_name"
#             for l in infile:
#                 l = [x.strip().strip('"') for x in l.strip().strip('"').split(",")]
#                 res.append(dict(zip(headers,l)))
#         print("res", res)
#         inst.source_json_set = json.dumps(res)
#         inst.save()

def make_unique_directory_path(instance, filename):
    return 'documents/'+datetime.date.today().isoformat()+"/"+str(uuid4())+'/{0}'.format(filename)


