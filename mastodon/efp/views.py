from django.shortcuts import render
from .models import Gene

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

def index(request):
    result_list = Gene.objects.all()  # all the results
    context = {'result_list': result_list}
    return render(request, 'efp/index.htm', context)