from django.contrib import admin
from .models import Gene, GeneSetComparison, TPM_csv, FDR_csv
# Register your models here.

class GeneAdmin(admin.ModelAdmin):
    pass


class TPM_CSVAdmin(admin.ModelAdmin):
    pass

class FDR_CSVAdmin(admin.ModelAdmin):
    pass



class GeneSetComparisonAdmin(admin.ModelAdmin):
    pass

admin.site.register(Gene, GeneAdmin)
admin.site.register(GeneSetComparison, GeneSetComparisonAdmin)
admin.site.register(TPM_csv, TPM_CSVAdmin)
admin.site.register(FDR_csv, FDR_CSVAdmin)