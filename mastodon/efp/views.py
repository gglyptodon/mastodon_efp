from django.shortcuts import render
from django.http import JsonResponse
from .models import Gene,TPM_csv
from django.forms.models import model_to_dict

import json

# Create your views here.
def sgjson(request):
    pass


def mgjson(request):
    pass

def efp(request, id):
    print(id)
    result = Gene.objects.get(pk=id)
    context = {'result':result}
    template = 'efp/single_efp.htm'
    return render(request, template, context)

def efpjson(request, id):
    print(id)
    result = Gene.objects.get(pk=id)
    result = model_to_dict(result)
    return JsonResponse(result, safe=False)


def sgindex(request):
    result_list = Gene.objects.all()  # all the results
    context = {'result_list': result_list}
    return render(request, 'efp/single_efp.htm', context)

def mgindex(request):
    result_list = Gene.objects.all()  # all the results
    context = {'result_list': result_list}
    return render(request, 'efp/multi_hm.htm', context)

def genes(request):
    context = {}
    result_list = Gene.objects.all()[:1000]
    context["result_list"] = result_list
    template = 'efp/single_efp.htm'
    return render(request=request, template_name=template, context=context)

def gene_index(request):
    context = {}
    result_list = Gene.objects.all()
    context["result_list"] = [str(r.maize_name) for r in result_list]
    template = 'efp/index_efp.htm'
    return render(request=request, template_name=template, context=context)

def tablejson(request):
    name="foo"
    context = {}
    result = TPM_csv.objects.get(name=name)
    res = json.loads(result.source_json_TPM)
    return JsonResponse(res,safe=False)

def table(request):
    context = {}
    template = 'efp/table.htm'
    return render(request=request, template_name=template, context=context)


def index(request):
    result_list = Gene.objects.all()  # all the results
    context = {'result_list': result_list}
    return render(request, 'efp/index.htm', context)